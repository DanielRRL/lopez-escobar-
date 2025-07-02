interface DefaultLayoutProps {
    children: React.ReactNode;
}

export function DefaultLayout({children}: DefaultLayoutProps) {
    return (
        <>
            <h1>Hola Mundo</h1>
            <main>{children}</main>
        </>
    )
}