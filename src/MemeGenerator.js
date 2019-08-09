import React, {Component} from 'react';

class MemeGenerator extends Component {
  constructor (){
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: []
    }
  }

  componentDidMount () {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(response => {
        console.log(response.data.memes[0]);
        this.setState({
          allMemeImgs: response.data.memes
        })
      })
  }



  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };


  handleClick = (event) => {
    event.preventDefault();
    const rand = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[rand].url;
    this.setState({
      randomImage: randMemeImg
    });


  };



  render (){
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            name="topText"
            onChange={this.handleChange}
            value={this.state.topText}
            placeholder="Top Text"
          />
          <input
            type="text"
            name="bottomText"
            onChange={this.handleChange}
            value={this.state.bottomText}
            placeholder="Bottom Text"
          />
          <button onClick={this.handleClick}>Gen</button>
        </form>

        <div className="meme">
          <img align="center" src={this.state.randomImage} className="image" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>

    )
  }
}

export default MemeGenerator;