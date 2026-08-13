/**
 * useTasks.js
 * Hook avanzado que gestiona las misiones del usuario con useReducer.
 * Carga la lista al montar y expone crear/editar/eliminar/completar,
 * actualizando el estado local sin recargar toda la lista.
 */

import { useReducer, useEffect, useCallback } from 'react';
import { api } from '../api/client.js';

const initialState = { tasks: [], loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { tasks: action.payload, loading: false, error: null };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    case 'add':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'update':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case 'remove':
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) };
    default:
      return state;
  }
};

export const useTasks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(async () => {
    try {
      const { tasks } = await api.get('/tasks');
      dispatch({ type: 'load', payload: tasks });
    } catch (err) {
      dispatch({ type: 'error', payload: err.message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** Crea una mision y la añade al principio de la lista */
  const createTask = async (data) => {
    const { task } = await api.post('/tasks', data);
    dispatch({ type: 'add', payload: task });
    return task;
  };

  /** Edita una mision existente */
  const updateTask = async (id, data) => {
    const { task } = await api.patch(`/tasks/${id}`, data);
    dispatch({ type: 'update', payload: task });
    return task;
  };

  /** Elimina una mision */
  const deleteTask = async (id) => {
    await api.del(`/tasks/${id}`);
    dispatch({ type: 'remove', payload: id });
  };

  /** Completa una mision; devuelve la XP ganada y posible subida de nivel */
  const completeTask = async (id) => {
    const result = await api.post(`/tasks/${id}/complete`);
    dispatch({ type: 'update', payload: result.task });
    return result;
  };

  return { ...state, createTask, updateTask, deleteTask, completeTask, reload: load };
};
