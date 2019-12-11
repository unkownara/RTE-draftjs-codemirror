import React, { useState, ReactSVG } from 'react';
import { EditorState, Modifier } from 'draft-js';
import { ToolbarIcon } from '../ToolbarIcons'
import styled from 'styled-components';
import CodeIcon from '../../code.png';
import SaveIcon from '../../SaveIcon.png';
import BackIcon from '../../BackIcon.png';

type CodeMirrorPluginPropsT = {
    // content: string,
    editorState: EditorState,
    onChange: (editorState: any) => any,
    onChangeToolbar: any
    // onChangeCodeMirror: (editor: Editor, data: EditorChange, value: string) => void
};

export const CodeMirrorPlugin: React.SFC<CodeMirrorPluginPropsT> = props => {

    const { onChangeToolbar } = props;

    const addStar = () => {
        const { editorState, onChange } = props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            CodeIcon,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    }

    return (
        <>
            <EditorToolbarDiv onClick={onChangeToolbar}>
                <ToolbarIcon icon={CodeIcon} />
            </EditorToolbarDiv>
        </>
    )
}


type CodeMirrorToolbarPropsT = {
    onSave: (event: React.MouseEvent<HTMLElement>) => void,
    onBack: (event: React.MouseEvent<HTMLElement>) => void
};

export const CodeMirrorToolbar: React.SFC<CodeMirrorToolbarPropsT> = props => {
    const { onSave, onBack } = props;
    return (
        <ToolbarWrapper>
            <IconWrapper onClick={onSave}>
                <ToolbarIcon icon={SaveIcon} />
            </IconWrapper>
            <IconWrapper onClick={onBack}>
                <ToolbarIcon icon={BackIcon} />
            </IconWrapper>
        </ToolbarWrapper>
    )
}

const ToolbarWrapper = styled.div`
    border: 1px solid #E4E5E5;
    height: 40px;
`;

const IconWrapper = styled.span`
    padding: 2px;
    cursor: pointer;
`;

const EditorToolbarDiv = styled.div`
    cursor: pointer;
`;