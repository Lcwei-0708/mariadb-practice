import { memo } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/sql/sql';

const SQLEditor = memo(({ query, setQuery }) => (
  <div className="editor-content">
    <h2>SQL 查詢編輯器</h2>
    <CodeMirror
      value={query}
      options={{
        mode: 'sql',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: true,
        lint: true,
        viewportMargin: Infinity,
      }}
      onBeforeChange={(editor, data, value) => setQuery(value)}
      editorDidMount={(editor) => editor.refresh()}
    />
  </div>
));

export default SQLEditor;