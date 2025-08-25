import React, { Component } from 'react';
import Head from 'next/head';

interface HomeState {
  id: string;
}

class Home extends Component<{}, HomeState> {
  state = {
    id: ''
  }

  appChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      id: e.target.value
    });
  }

  appClick = () => {
    window.open(window.location.href + "v2/" + this.state.id, "_self");
  }

  render() {
    const { id } = this.state;
    const { appChange, appClick } = this;
    return (
      <>
        <Head>
          <title>GIThru - Git Repository Analyzer</title>
          <meta name="description" content="Contextual History Analysis Tool" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="App">
          <header className="App-header">
            <input type="text" placeholder="Repository name" value={id} onChange={appChange} />
            <button onClick={appClick}>Open!!</button>
          </header>
        </div>
      </>
    );
  }
}

export default Home;
