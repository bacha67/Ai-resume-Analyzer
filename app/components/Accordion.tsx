import React, { createContext, useContext, useState } from "react";

interface AccordionContextType {
    openItems: string[];
    toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const Accordion = ({ children }: { children: React.ReactNode }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className="flex flex-col gap-4 w-full">{children}</div>
        </AccordionContext.Provider>
    );
};

export const AccordionItem = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
            {children}
        </div>
    );
};

export const AccordionHeader = ({
    itemId,
    children,
}: {
    itemId: string;
    children: React.ReactNode;
}) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionHeader must be used within Accordion");

    const isOpen = context.openItems.includes(itemId);

    return (
        <button
            type="button"
            className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => context.toggleItem(itemId)}
        >
            <div className="flex-grow">{children}</div>
            <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </button>
    );
};

export const AccordionContent = ({
    itemId,
    children,
}: {
    itemId: string;
    children: React.ReactNode;
}) => {
    const context = useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    const isOpen = context.openItems.includes(itemId);

    if (!isOpen) return null;

    return (
        <div className="p-6 border-t border-gray-100 bg-gray-50 animate-in fade-in duration-300">
            {children}
        </div>
    );
};
