import React, { useState, useEffect } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/edit/closetag';
import './App.css';
import htmlToDraft from 'html-to-draftjs';
import { CodeMirrorPlugin, CodeMirrorToolbar } from './components/Editor';
import 'draft-js/dist/Draft.css';
var h2p = require('html2plaintext');

const App: React.FC<{}> = () => {

	const blocksFromHtml = htmlToDraft("");
	const { contentBlocks, entityMap } = blocksFromHtml;
	const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

	const [isCodeMirrorOpen, setIsCodeMirrorOpen] = useState(false);
	const [content, setContent] = useState('');

	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
	const [value, setValue] = useState('');

	console.log('editor', editorState);

	useEffect(() => {
		console.log('code mirror value ', value);
		console.log('content ', content);
		console.log('draft ', draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}, [editorState]);

	useEffect(() => {
		setValue(content);
	}, [content]);

	const onEditorStateChange = (editorState: any) => {
		setEditorState(editorState);
	}

	const uploadCallback = (file: any) => {
		// let uploadedImages = this.state.uploadedImages;

		const imageObject = {
			file: file,
			localSrc: URL.createObjectURL(file)
		}

		// uploadedImages.push(imageObject);


		// this.setState(uploadedImages: uploadedImages)

		// We need to return a promise with the image src
		// the img src we will use here will be what's needed
		// to preview it in the browser. This will be different than what
		// we will see in the index.md file we generate.
		return new Promise(
			(resolve, reject) => {
				resolve({ data: { link: imageObject.localSrc } });
			}
		);
	}

	const onChangeCodeMirror = (editor: any, data: any, value: string) => {
		setValue(value);
	}


	const onChangeToolbar = () => {
		setIsCodeMirrorOpen(s => !s);
	}

	const onSaveButton = () => {
	}

	const onBackButton = () => {
		const blocksFromHtml = htmlToDraft(value);
		const { contentBlocks, entityMap } = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		setEditorState(EditorState.createWithContent(contentState));
		setIsCodeMirrorOpen(false);
	}

	return (
		<>
			{isCodeMirrorOpen === false ?
				<Wrapper>
					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName editorClassName2"
						toolbarCustomButtons={[<CodeMirrorPlugin editorState={editorState} onChange={onEditorStateChange} onChangeToolbar={onChangeToolbar} />]}
						toolbar={{
							image: {
								uploadCallback: uploadCallback
							}
						}}
						onEditorStateChange={onEditorStateChange}
						spellCheck={true}
					/>
				</Wrapper>
				:
				<Wrapper>
					<CodeMirrorToolbar
						onSave={onSaveButton}
						onBack={onBackButton}
					/>
					<CodeMirror
						value={content}
						options={{
							mode: 'xml',
							theme: 'dracula',
							lineNumbers: true,
							autoCloseTags: true
						}}
						onChange={onChangeCodeMirror}
					/>
				</Wrapper>
			}
		</>
	)
}


const Wrapper = styled.div`
	padding: 20px;
	margin: 10px;
	height: auto;
	min-height: 600px;
	width: 90%;
	border: 1px solid #E4E5E5;
	border-radius: 4px;
`;

export default App;