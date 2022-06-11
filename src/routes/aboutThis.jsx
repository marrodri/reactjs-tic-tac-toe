// TODO
export default function AboutThis() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h3
        class="font-medium
					leading-tight
					text-3xl
					mt-0
					mb-2
					text-blue-500
				"
      >
        About This
      </h3>
      <p className="text-2xl">
        This website is built with the purpose of {" \n"}
        learning the basics and foundations of reactJS; along with website{" "}
        {" \n"}
        deployment with Netlify, navigation with react router dom, {" \n"}
        and styling with TailWind.
      </p>
    </main>
  );
}
