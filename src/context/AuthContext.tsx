import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut } from '../lib/supabase';
import { User, ArrivalPlan } from '../types'; // Import ArrivalPlan

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (email: string, password: string, isReturningSnowbird?: boolean) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (supabaseUser: SupabaseUser) => {
    const { data: arrivalPlanData, error: arrivalPlanError } = await supabase
      .from('arrival_plans')
      .select('*')
      .eq('user_id', supabaseUser.id)
      .single();

    if (arrivalPlanError && arrivalPlanError.code !== 'PGRST116') { // PGRST116 means "no rows found"
      console.error('Error fetching arrival plan:', arrivalPlanError);
    }

    return {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      isReturningSnowbird: supabaseUser.user_metadata?.isReturningSnowbird,
      arrivalPlan: arrivalPlanData as ArrivalPlan | undefined // Cast to ArrivalPlan
    };
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = await fetchUserData(session.user);
        setUser(userData);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = await fetchUserData(session.user);
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    return { error };
  };

  const register = async (email: string, password: string, isReturningSnowbird = false) => {
    const { error } = await signUp(email, password, isReturningSnowbird);
    return { error };
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
