import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'


const YT_API_KEY = "AIzaSyB-eACqTkwy-TkOM_E0xtPnjPGWd3t1Nu0"

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			selectedVideo : null,
			videos : []
		}

		this.videoSearch('la vida moderna')
	}

	videoSearch(term){
		YTSearch({key: YT_API_KEY, term : term}, (videos) => {
			this.setState({
					selectedVideo: videos[0],
					videos:videos
				})
		})
	}

	render(){
		return (
			<div>
				<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
