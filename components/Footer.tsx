import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full mx-auto container">
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' <3'}
            </a>
        </footer>
    )
}
