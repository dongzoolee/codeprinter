import { EditorView, basicSetup } from "codemirror";
import styled from "styled-components";
import { useEffect, useRef } from "react";

import { Page } from "./common/ui/page/page";

import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";

const langExts: LanguageSupport[] = [javascript()];
const defaultState = EditorState.create({
  doc: "\n\n\n",
  extensions: [basicSetup, keymap.of(defaultKeymap), ...langExts],
});

const CodemirrorWrapper = styled.div`
  height: 80vh;
`;
const _App = ({ className }: { className?: string }) => {
  const codemirrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!codemirrorRef.current) return;
    const view = new EditorView({
      state: defaultState,
      parent: codemirrorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <Page className={className}>
      <CodemirrorWrapper
        id="codemirror"
        className="printable"
        ref={codemirrorRef}
      />
    </Page>
  );
};

export const App = styled(_App)`
  @media print {
    * {
      visibility: hidden;
    }

    .printable {
      visibility: visible;
      position: absolute;
      top: 1;
      left: 0;
    }

    .printable * {
      visibility: visible;
    }
  }
`;
