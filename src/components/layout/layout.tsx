// These styles apply to every route in the application
import '../../../styles/globals.css';
import Home from '../../../pages/index';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='ko'>
            <Home />
            <div>{children}</div>
        </html>
    );
}
