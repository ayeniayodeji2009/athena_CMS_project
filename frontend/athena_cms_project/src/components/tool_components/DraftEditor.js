import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./styles/tool_components"
// import "./styles/tool_components"
import draftToHtml from "draftjs-to-html"

export default class DraftEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        return (
            <div className='editor'>
                <Editor 
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    // wrapperClassName="wrapperClassName"
                    // editorClassName="editorClassName"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    // wrapperClassName="wrapper-class"
                    // editorClassName="editor-class"
                    // toolbarClassName="toolbar-class"
                    // toolbar={{
                    //     inline: { inDropdown: true },
                    //     list: { inDropdown: true },
                    //     textAlign: { inDropdown: true },
                    //     link: { inDropdown: true },
                    //     history: { inDropdown: true },}}
                />
            </div>
        );
    }
}








// const CustomToolbar = () => (
//     <div id="toolbar">
//       <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
//         <option value="1">Heading 1</option>
//         <option value="2">Heading 2</option>
//         <option value="">Normal</option>
//       </select>
//       <button className="ql-bold">Bold</button>
//       <button className="ql-italic">Italic</button>
//       <button className="ql-underline">Underline</button>
//       <button className="ql-link">Link</button>
//       <button className="ql-image">Image</button>
//       <button className="ql-align" value="left">Left</button>
//       <button className="ql-align" value="center">Center</button>
//       <button className="ql-align" value="right">Right</button>
//       <button className="ql-align" value="justify">Justify</button>
//     </div>
//   );
  
//   const MyEditor = () => {
//     const [value, setValue] = useState('');
  
//     return (
//       <div>
//         <CustomToolbar />
//         <ReactQuill
//           value={value}
//           onChange={setValue}
//           modules={{
//             toolbar: {
//               container: '#toolbar',
//             },
//           }}
//           formats={['header', 'bold', 'italic', 'underline', 'link', 'image', 'align']}
//         />
//       </div>
//     );
//   };
  
//   export default MyEditor;
  




//   import React, { useState } from 'react';
// import ReactQuill, { Quill } from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import ImageDrop from 'quill-image-drop-module';

// Quill.register('modules/imageDrop', ImageDrop);

// const MyEditor = () => {
//   const [value, setValue] = useState('');

//   return (
//     <div>
//       <ReactQuill
//         value={value}
//         onChange={setValue}
//         modules={{
//           toolbar: [
//             [{ header: '1' }, { header: '2' }, { font: [] }],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             ['bold', 'italic', 'underline'],
//             ['image'],
//             [{ align: [] }],
//           ],
//           imageDrop: true,
//         }}
//         formats={['header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'image', 'align']}
//       />
//     </div>
//   );
// };

// export default MyEditor;
