import React, { Component } from 'react';
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import Subject from './components/Subject'
import Control from './components/Control'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  //render보다 먼저 실행
  //render 실행 전 state 값 초기화 담당
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id:2,
      Subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'welcome', desc:'Hello, React!!'},
      contents : [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'Javascript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(this.state.selected_content_id === data.id)
        {
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>;
    }
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _title = _content.title;
      _desc = _content.desc;
      
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>;
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _content = this.state.contents.concat({
          id : this.max_content_id, title : _title, desc : _desc
        })
        this.setState({contents : _content, mode:'read', selected_content_id: this.max_content_id});
      }.bind(this)}></CreateContent>;
    }
    else if(this.state.mode === 'update'){
      var _content = this.getReadContent();

      _article = <UpdateContent data={_content} onUpdate={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i = i + 1;
        }
        this.setState({contents:_contents, mode:'read'});
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject title={this.state.Subject.title} sub={this.state.Subject.sub} 
        onChange={function(){
          this.setState({mode:'welcome', selected_content_id : 0})
        }.bind(this)}
        ></Subject>
        <TOC onChange={function(id){
              this.setState({
                mode:'read',
                selected_content_id: Number(id)
              })
            }.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('삭제하시겠습니까?')){
              var _contents = Array.from(this.state.contents);
              var i = 0;
              
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }

                i = i + 1;
              }

              this.setState({contents : _contents, mode:'welcome'});
                alert('삭제되었습니다.');
            }
          }
          else{
            this.setState({mode : _mode})
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
