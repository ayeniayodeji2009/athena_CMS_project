import { Helmet } from "react-helmet";

export default function HTMLHead ({ pageTitle, pageMetaDescription }) {
    return (
        <Helmet>
            <title>{`${pageTitle} - Athena Project`}</title>
            <meta name="description" content={pageMetaDescription || `Athena Project Content`} />
            {/* <link rel="icon" type="image/png" href={`https://st4.depositphotos.com/1512450/23525/v/600/depositphotos_235254020-stock-illustration-greek-antique-pattern-alexander-great.jpg`} /> */}
        </Helmet>
    )
}