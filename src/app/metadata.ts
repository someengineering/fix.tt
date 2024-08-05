import {Metadata} from "next";
import {siteConfig} from "@/constants/config";

export const metadata: Metadata = {
    alternates: {
        // ...rootMetadata.alternates,
        canonical: siteConfig.url,
    },
};
