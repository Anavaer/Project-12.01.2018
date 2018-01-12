import React from 'react';
import VideoTemp from './VideoTemp';

class Section extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      maxResults: '12',
      windowScroll: 600,
      category: this.props.category
    };
  }
  componentDidMount() {
    this.loadVideos(this.state.category, this.state.maxResults);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if(window.scrollY > this.state.windowScroll) {
      this.setState({windowScroll: this.state.windowScroll + 600});
      this.loadMoreVideos();
    }
  };

  loadVideos = (param, results) => {
    let url = 'https://www.googleapis.com/youtube/v3/search?';
    const params = {
      part: 'snippet',
      maxResults: results,
      key: 'AIzaSyD2Btj7YrVSmtCFTuuAr5asFo1uVszu8e0',
      type: 'video',
      order: 'viewCount',
      q: param || 'javascript',
      publishedAfter: '2016-05-02T15:00:00Z',
      topicId: '/m/07c1v'
    };

    Object.keys(params)
      .forEach(param => {
        url += `${param}=${params[param]}&`;
      });

    fetch(url)
      .then(blob => blob.json())
      .then(data => this.setState({
        popularVids: [...data.items].map(item => {
          return {
            channelId: item.snippet.channelId,
            channel: item.snippet.channelTitle,
            title: item.snippet.title,
            desc: item.snippet.description,
            thumbnails: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt,
            id: item.id.videoId
          }
        })
      }));

  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.category) {
      this.loadVideos(nextProps.category, this.state.maxResults);
      this.setState({category: nextProps.category});
    } else {
      this.loadVideos(nextProps.search, this.state.maxResults);
      this.setState({category: nextProps.search});
    }
  }

  loadMoreVideos = () => {
    let url = 'https://www.googleapis.com/youtube/v3/search?';

    const params = {
      part: 'snippet',
      maxResults: +this.state.maxResults + 6,
      key: 'AIzaSyD2Btj7YrVSmtCFTuuAr5asFo1uVszu8e0',
      type: 'video',
      order: 'viewCount',
      q: this.state.category || 'javascript',
      publishedAfter: '2016-05-02T15:00:00Z',
      topicId: '/m/07c1v'
    };
    this.setState({maxResults: params.maxResults});
    Object.keys(params)
      .forEach(param => {
        url += `${param}=${params[param]}&`;
      });

    fetch(url)
      .then(blob => blob.json())
      .then(data => this.setState({
        popularVids: [...data.items].map(item => {
          return {
            channelId: item.snippet.channelId,
            channel: item.snippet.channelTitle,
            title: item.snippet.title,
            desc: item.snippet.description,
            thumbnails: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt,
            id: item.id.videoId
          }
        })
      }));
  };

  render() {
    const{user, isLoggedIn} = this.props;
    const uuidv4 = require('uuid/v4');
    if(!this.state.popularVids) {
      return(
        <div className="section">
          <p>wait for it</p>
        </div>
      )
    } else {
      return (

        <div className="section">
          {this.state.popularVids.map(video => {
            return <VideoTemp
              key={uuidv4()}
              videoData={video}
              user={user}
              isLoggedIn={isLoggedIn}
            />
          })}
        </div>
      );
    }
  }
}

export default Section;