import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Global_States_Actions from './Contexts/Global_States_Actions';
import NoteState from './Contexts/notes/NotesState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <NoteState>
      <Global_States_Actions>
        <App />
      </Global_States_Actions>
    </NoteState>
  // <React.StrictMode>
  // </React.StrictMode>
);

