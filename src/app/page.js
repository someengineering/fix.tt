import PageComponent from "../components/PageComponent";

export default async function Page() {
    const slug = "home";
    return <PageComponent slug={slug} />;
}
