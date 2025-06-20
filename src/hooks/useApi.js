
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export function useApi(apiFunction, options = {}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const { toast } = useToast();
  const { immediate = true, onSuccess, onError } = options;

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiFunction();
      setState({ data: result, loading: false, error: null });
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      
      if (onError) {
        onError(errorMessage);
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

export function useMutation(apiFunction, options = {}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const { toast } = useToast();
  const { onSuccess, onError } = options;

  const mutate = async (params) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiFunction(params);
      setState({ data: result, loading: false, error: null });
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      
      if (onError) {
        onError(errorMessage);
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      throw error;
    }
  };

  return {
    ...state,
    mutate,
  };
}
