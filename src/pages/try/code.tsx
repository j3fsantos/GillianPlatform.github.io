import React from 'react';
import { ControlledEditor } from "@monaco-editor/react";

const options = { minimap: { enabled: false } };

export default ({ value, onChange, language }) => {
  return <ControlledEditor options={options} value={value} onChange={onChange} language={language} />
}
