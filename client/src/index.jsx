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
  }

  componentDidMount() {
    $.ajax('http://localhost:1128/repos').then(data => {
      console.log('data here', data);
      this.setState({repos: data})
    });
  }

  search(term) {
    console.log(`${term} was searched`);
    let data = {};
    data.username = term;
    $.ajax({
      type: 'GET',
      url: 'http://localhost:1128/repos',
      dataType: 'json',
      success: (data) => {
        return data;
      },
    }).then((data) => {
      this.setState({
        repos: data,
      });
      console.log('data is', data);
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
