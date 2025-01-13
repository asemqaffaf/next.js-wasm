'use client';

import { useEffect, useState } from 'react';
import init, { greet, add, fetch_wasm_map, fetch_wasm_json } from '../../wasm-module/pkg/wasm_module';

const Index = () => {
  const [result, setResult] = useState('');
  const [sum, setSum] = useState(0);
  const [apiMap, setApiMap] = useState<Map<string, string>>();
  const [apiJson, setApiJson] = useState<{title:string}>();

  useEffect(() => {
    init().then(() => {
      setResult(greet('World'));
      setSum(add(1, 1));
      fetch_wasm_map('https://jsonplaceholder.typicode.com/todos/1').then((v) => {
        console.log('v :>> ', v);
        setApiMap(v);
      });
      fetch_wasm_json('https://jsonplaceholder.typicode.com/todos/1').then((v) => {
        console.log('json v :>> ', v);
        setApiJson(v);
      });
    });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <button className='text-9xl' onClick={() => setSum(add(sum + 1, sum + 1))}>
        +
      </button>
      <h1 className='text-4xl m-10'>{result}</h1>
      <h1 className='text-4xl'>{sum}</h1>
      <h1 className='text-4xl mb-10'>{JSON.stringify(apiMap && [...apiMap?.entries()])}</h1>
      <h1 className='text-4xl'>{JSON.stringify(apiJson?.title)}</h1>
    </div>
  );
};

export default Index;
