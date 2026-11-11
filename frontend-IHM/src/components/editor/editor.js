import React, { useState, useMemo, useEffect, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import './editor.css';

import words from './editorLan.json';

const Editor = (props, { placeholder }) => {
  const [content, setContent] = useState('');

  const [Uword, setUword] = useState(words["en"]);

  useEffect(() => {
    select_idioma();
  }, []);

  const select_idioma = () => {
    let idi = localStorage.getItem('idioma');
    if (!idi || (idi != "pt" && idi != "en" && idi != "es")) {
      idi = "en";
    }
    let word = words[idi];
    setUword(word);
  }

  useEffect(() => {
    props.setContent(content);
  }, [content]);

  useEffect(() => {
    if (props.sinopse !== content) {
      setContent(props.sinopse);
    }
  }, [props.sinopse]);

  useEffect(() => {
    if (props.content !== content) {
      setContent(props.content);
    }
  }, [props.content]);

  const debouncedSetContent = useCallback(
    debounce((newContent) => {
      setContent(newContent);
    }, 800),
    []
  );

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || Uword.placed,
      ignoreDebounce: true,
    }),
    [placeholder, Uword]
  );

  const handleChange = (newContent) => {
    debouncedSetContent(newContent);
  };

  return (
    <div className="minha-div-pai">
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onChange={handleChange}
      />
    </div>
  );
};


function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default Editor;
