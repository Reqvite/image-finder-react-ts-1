import { ThemeProvider } from "styled-components";
import { Component } from "react";
import { theme } from "../theme/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Notification } from "./Notification/Notification";
import { Modal } from "./Modal/Modal";

import * as API from "./services/api";

export interface Image {
  id: number;
  webformatURL: string;
  tags: string;
}

type ImageFinderState = {
  page: number;
  query: string;
  data: Image[];
  status: string;
  showModal: boolean;
  photoIdx: number | null;
  error: null | string;
};

export class App extends Component<{}, ImageFinderState> {
  state = {
    page: 1,
    query: "",
    data: [],
    status: "idle",
    showModal: false,
    photoIdx: null,
    error: null,
  };

  componentDidUpdate(_: any, prevState: ImageFinderState): void {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: "pending" });
      this.getData(query, page)
        .then((resp) => this.updateData(resp))
        .catch((error) => this.handleError(error));
    }
  }

  updateData = (resp: any) => {
    const dataLength = this.state.data.length;

    const { totalHits, hits } = resp.data;
    if (hits.length === 0) {
      throw new Error("No results for your search.");
    }
    if (dataLength + 12 >= totalHits) {
      this.setState((state) => ({
        data: [...state.data, ...hits],
        status: "idle",
      }));
      toast(
        `A total of ${totalHits} results were shown, there are no more photos for this query.`
      );
      return;
    }
    if (dataLength === 0) {
      toast(`${totalHits} images were found for your request.`);
    }
    this.setState((state) => ({
      data: [...state.data, ...hits],
      status: "resolved",
    }));
  };
  handleError = (error: any | string) => {
    this.setState({
      status: "rejected",
      error: error.message,
    });
  };

  handleQuerySubmit = (query: string): void => {
    this.setState({
      page: 1,
      query,
      data: [],
    });
  };

  getData = async (newQuery: string, page?: number) => {
    return await API.getData(newQuery, this.state.page);
  };

  loadMore = (): void => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (id?: number | undefined): void => {
    const photoIdx = this.state.data.findIndex(({ id: newId }) => newId === id);
    this.setState((state) => ({
      showModal: !state.showModal,
      photoIdx,
    }));
  };

  render() {
    const { data, query, status, showModal, photoIdx, error } = this.state;
    const checkPhotoIdx: any = photoIdx ? photoIdx : "";
    const { largeImageURL, tags } = data[checkPhotoIdx] ?? "";
    return (
      <ThemeProvider theme={theme}>
        <Searchbar onSubmit={this.handleQuerySubmit} newQuery={query} />

        {data.length !== 0 && (
          <ImageGallery data={data} toggleModal={this.toggleModal} />
        )}
        {status === "rejected" && <Notification error={error} />}
        {status === "pending" && <Loader />}
        {status === "resolved" && <Button loadMore={this.loadMore} />}

        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    );
  }
}
