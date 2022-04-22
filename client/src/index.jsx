import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
    this.autoRepos = this.autoRepos.bind(this);
  }

  componentDidMount() {
    // $.ajax('http://localhost:1128/repos').then((data) => {
    //   console.log('data here', data);
    //   this.setState({ repos: data });
    // });
    this.autoRepos();
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: { term },
      success: () => {
        console.log('Search successfully');
        this.autoRepos();
      },
    });
  }

  autoRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        this.setState({
          repos: data,
        });
      },
      error: function (err) {
        console.log('Error is here!');
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
