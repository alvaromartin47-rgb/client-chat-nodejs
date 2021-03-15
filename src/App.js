import './App.css';

import Chat from './components/Chat'

const styleApp = {
  backgroundColor:"black",
  height: "100vh",
  width: "100vw"
}

function App() {
  return (
    <div className="App" style={styleApp}>
      <Chat />
    </div>
  );
}

export default App;
