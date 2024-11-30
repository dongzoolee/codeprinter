import { repeat } from "lodash-es";
import { EditorView, basicSetup } from "codemirror";
import styled from "styled-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { RiPrinterLine } from "@remixicon/react";

import { defaultKeymap } from "@codemirror/commands";
import { EditorState, Compartment } from "@codemirror/state";
import { keymap } from "@codemirror/view";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { cpp } from "@codemirror/lang-cpp";

import { Page } from "@leed/ui/page/page";
import { SelectFieldBase } from "@leed/ui/fields/select-field/select-field-base";
import { FlexRow } from "@leed/ui/css-presets/flex";
import { Button } from "@leed/ui/button/button";

const langConf = new Compartment();
const defaultState = EditorState.create({
  doc: repeat("\n", 48),
  extensions: [
    basicSetup,
    EditorView.theme({
      ".cm-content": { backgroundColor: "white" },
    }),
    keymap.of(defaultKeymap),
    langConf.of(javascript()),
    EditorView.lineWrapping,
  ],
});

const langConfMap = {
  cpp: {
    label: "C/C++",
    langConf: cpp(),
  },
  ts: {
    label: "TypeScript",
    langConf: javascript({ typescript: true }),
  },
  tsx: {
    label: "React TypeScript",
    langConf: javascript({ typescript: true, jsx: true }),
  },
  js: {
    label: "JavaScript",
    langConf: javascript(),
  },
  jsx: {
    label: "React JavaScript",
    langConf: javascript({ jsx: true }),
  },
  py: {
    label: "Python",
    langConf: python(),
  },
  html: {
    label: "HTML",
    langConf: html(),
  },
} as const;
type TLangValue = keyof typeof langConfMap;
const langSelectOptions = Object.entries(langConfMap).map(
  ([value, { label }]) => ({
    value,
    label,
  })
) as { value: TLangValue; label: string }[];

const fontFamilyValues = [
  "Fira Code",
  "Pretendard",
  "IBM Plex Mono",
  "Cursive",
  "D2Coding",
] as const;
type TFontFamilyValue = (typeof fontFamilyValues)[number];
const fontFamilySelectOptions = fontFamilyValues.map((value) => ({
  value,
  label: value,
}));

const fontSizeRange = { min: 12, max: 30 } as const;

const SelectWrapper = styled(FlexRow)`
  margin-bottom: 0.4rem;
  column-gap: 2.4rem;
`;
const SelectLabel = styled.label`
  font-size: 1.4rem;
  line-height: 2.2rem;
`;
const CodemirrorWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fontFamily", "fontSize"].includes(prop),
})<{
  fontFamily: TFontFamilyValue;
  fontSize: number;
}>`
  max-height: 80rem;
  overflow-y: auto;

  * {
    font-family: ${({ fontFamily }) => fontFamily};
    font-size: ${({ fontSize }) => fontSize}px;
  }
`;
const PrintButton = styled(Button)`
  margin-top: 1.6rem;
`;
const _App = ({ className }: { className?: string }) => {
  const [lang, setLang] = useState<TLangValue>("js");
  const [fontFamily, setFontFamily] = useState<TFontFamilyValue>("Pretendard");
  const [fontSize, setFontSize] = useState<number>(fontSizeRange.min);

  const editorView = useRef<EditorView | null>(null);
  const codemirrorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!codemirrorRef.current) return;

    editorView.current = new EditorView({
      state: defaultState,
      parent: codemirrorRef.current,
    });

    return () => {
      if (editorView.current) {
        editorView.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorView.current) {
      editorView.current.dispatch({
        effects: langConf.reconfigure(langConfMap[lang].langConf),
      });
    }
  }, [lang]);

  useEffect(() => {
    if (codemirrorRef.current) {
      codemirrorRef.current.scrollTo({ top: 0 });
    }
  }, [fontSize]);

  return (
    <Page className={className}>
      <SelectWrapper>
        <SelectLabel>
          Language
          <SelectFieldBase
            value={lang}
            onChange={(v: TLangValue) => setLang(v)}
            optionInputProps={{ error: "", onSubmit: () => {} }}
            options={langSelectOptions}
          />
        </SelectLabel>
        <SelectLabel>
          FontFamily
          <SelectFieldBase
            value={fontFamily}
            onChange={(v) => setFontFamily(v)}
            optionInputProps={{ error: "", onSubmit: () => {} }}
            options={fontFamilySelectOptions}
          />
        </SelectLabel>
        <SelectLabel style={{ width: "20rem", marginLeft: "0.8rem" }}>
          FontSize
          <Slider
            {...fontSizeRange}
            marks={{
              12: "12px",
              30: "30px",
            }}
            tooltip={{ formatter: (v) => `${v}px` }}
            onChange={(v) => setFontSize(v)}
          />
        </SelectLabel>
      </SelectWrapper>
      <CodemirrorWrapper
        id="codemirror"
        className="printable"
        fontFamily={fontFamily}
        fontSize={fontSize}
        ref={codemirrorRef}
      />
      <FlexRow justifyContent="flex-end">
        <PrintButton
          type="primary"
          icon={<RiPrinterLine size={16} />}
          iconPosition="end"
          onClick={() => window.print()}
        >
          Print
        </PrintButton>
      </FlexRow>
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
      top: 0;
      left: 0;
    }

    .printable * {
      visibility: visible;
    }

    ${CodemirrorWrapper} {
      max-height: unset;
    }
  }
`;
