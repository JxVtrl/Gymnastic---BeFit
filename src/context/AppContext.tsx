import React, { createContext, useContext, useEffect, useState, useRef } from 'react'

const AppContext = createContext({})

export function AppProvider({ children }: any) {

    const value = {

    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    return useContext(AppContext)
}
