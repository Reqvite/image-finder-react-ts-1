import { AiOutlineSearch } from 'react-icons/ai';

import {
  Header,
  FormContainer,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

import { toast } from 'react-toastify';
import { Component } from 'react';

interface SearchbarProps {
  onSubmit: (query: string) => void;
  newQuery: string;
}

export class Searchbar extends Component<SearchbarProps, {}> {
  state = {
    query: '',
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      toast('The field must not be empty, please enter something.');
      return;
    }
    if (query.trim() === this.props.newQuery) {
      toast('Enter something new..');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
    e.currentTarget.reset();
  };

  render() {
    return (
      <Header>
        <FormContainer onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <AiOutlineSearch size={32} />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </FormContainer>
      </Header>
    );
  }
}
