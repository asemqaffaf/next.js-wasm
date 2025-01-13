/* eslint-disable react/no-danger-with-children */
'use server';

import { join } from 'path';
import { readFile } from 'fs/promises';

export default async function Index() {
  //   const wasmData = await initializeWasm();

  const wasmPath = join(process.cwd(), 'wasm-module', 'pkg', 'wasm_module_bg.wasm');
  const wasmBuffer = await readFile(wasmPath);

  // Initialize the WebAssembly module
  const { default: initWasm, fetch_wasm_html } = await import('../../../wasm-module/pkg/wasm_module');
  await initWasm(wasmBuffer);

  const content = await fetch_wasm_html(
    'https://www.squarespace.com/website-design/?channel=pnb&subchannel=go&campaign=pnb-go-row_japan-multi-core_website-e&subcampaign=(templates-en_web-template_e)&gad_source=1&gclid=CjwKCAiA7Y28BhAnEiwAAdOJUBKyRgSqOJBW6kRm5x5rTD5UZOrrFWnfWWy89QShLpprxcLaffcbeRoCmGYQAvD_BwE&gclsrc=aw.ds',
  ).catch((e) => console.error(e));

  // Only render the content if it exists
  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      {content ? (
        <div
          className='content-container'
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove any remaining script tags
              .replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, '') // Remove head section
              .replace(/<html[^>]*>/gi, '') // Remove html tag
              .replace(/<\/html>/gi, '') // Remove closing html tag
              .replace(/<body[^>]*>/gi, '') // Remove body tag
              .replace(/<\/body>/gi, '') // Remove closing body tag
              .replace(/<!DOCTYPE[^>]*>/gi, ''), // Remove doctype
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
