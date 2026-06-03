/**
 * useApi.js
 * Hook avanzado para consumir la API de forma declarativa.
 * Usa useReducer para gestionar los tres estados de una peticion
 * (loading / error / data) y expone un refetch para recargar.
 *
 * Uso: const { data, loading, error, refetch } = useApi(() => api.get('/tasks'));
 */

import { useReducer, useEffect, useCallback, useRef } from 'react';

const initialState = { data: null, loading: true, error: null };

/** Transiciones de estado de una peticion asincrona */
const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, loading: true, error: null };
    case 'success':
      return { data: action.payload, loading: false, error: null };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

/**
 * Ejecuta asyncFn al montar gestionando su estado de carga/error/datos.
 * Guarda la funcion en una ref para llamar siempre a la ultima version
 * sin recrear el efecto en cada render.
 * @param {Function} asyncFn funcion que devuelve una promesa (la peticion)
 */
export const useApi = (asyncFn) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const savedFn = useRef(asyncFn);

  // Mantiene la ref apuntando a la ultima version de asyncFn (fuera del render)
  useEffect(() => {
    savedFn.current = asyncFn;
  }, [asyncFn]);

  const run = useCallback(async () => {
    dispatch({ type: 'start' });
    try {
      const data = await savedFn.current();
      dispatch({ type: 'success', payload: data });
    } catch (err) {
      dispatch({ type: 'error', payload: err.message });
    }
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
};
