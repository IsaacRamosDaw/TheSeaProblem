import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  // Otros campos que pueda tener el usuario
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Usuario por defecto para pruebas
  const defaultUser: User = {
    id: 999,
    username: 'usuario_prueba',
    email: 'usuario@prueba.com',
    name: 'Usuario',
    lastname: 'Prueba'
  };
  
  // Descomentar la linea siguiente, comentar el defaultUser y la linea que utiliza el defaultUser  
  //const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(defaultUser);

  // Para pruebas, puedes comentar o descomentar esta línea
  // Si está comentada, el usuario estará autenticado por defecto
  // Si está descomentada, el usuario no estará autenticado por defecto
  /* useEffect(() => {
  setUser(null);
  }, []); */

  const login = (userData: User) => {
    setUser(userData);
    // Aquí podrías guardar el token en localStorage si lo tienes
    // localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    // Aquí podrías eliminar el token de localStorage
    // localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 