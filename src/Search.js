import React, { Component } from 'react';

class Search extends Component {

    render() {

        const searchResults = this.props.searchResults;

        let resultsArray = [];
        for (let i = 0; i < searchResults.length; i++) {
            resultsArray.push(
                <div id={searchResults[i]._id} key={i} className="searchresult">
                    {searchResults[i].name}
                    <button onClick={this.props.incrementScore} id={i}>Up</button>
                    <button onClick={this.props.decrementScore} id={i}>Down</button>
                    {searchResults[i].score}
                </div>
            )
        }

        resultsArray.sort( (a,b) => {
            return this.props.searchResults[b.key].score - this.props.searchResults[a.key].score;
        })

        return (
            <div id="searchcontainer">
                <form onSubmit={this.props.handleSearchSubmit}>
                    <label>
                        Tree Name:
                        <input type="text" onChange={this.props.handleSearchChange} />
                    </label>
                </form>
                {resultsArray}
            </div>
        )
    }
}

export default Search;
