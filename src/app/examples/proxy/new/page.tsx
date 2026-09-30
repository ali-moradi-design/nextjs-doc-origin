import { SubPage } from "../_components/sub-page";
import { PATHS } from "../_lib/constants";

export default async function Page({
  searchParams,
}: PageProps<"/examples/proxy/new">) {
  const { from } = await searchParams;

  return (
    <SubPage title="New page">
      <p>
        {from
          ? `The proxy redirected you here from ${from}.`
          : `You opened ${PATHS.new} directly.`}
      </p>
    </SubPage>
  );
}
