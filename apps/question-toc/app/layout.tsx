import React from "react"
import styles from "@/styles/Common.module.scss"

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <html lang="en">
                <body>
                    <main className={styles.container}>{children}</main>
                </body>
            </html>
        </>
    )
}

export default RootLayout
