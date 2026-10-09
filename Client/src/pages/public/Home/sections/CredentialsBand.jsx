import Container from "@/components/common/Container";
import StatCard from "@/components/cards/StatCard";

const stats = [
  { value: "20", symbol: "+", label: "Years of experience", note: "Established in 2001" },
  { value: "A", symbol: "–Class", label: "Construction company", note: "Quality. Integrity. Timely." },
  { value: "3", label: "Connected businesses", note: "One vision for your project" },
];

const CredentialsBand = () => {
  return (
    <section className="border-b border-[#dcd8cf] bg-[#eeece7]">
      <Container className="grid grid-cols-[1fr_1.15fr_1fr] gap-[34px] py-[29px] max-[960px]:gap-[22px] max-[700px]:w-[calc(100%-36px)]">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </Container>
    </section>
  );
};

export default CredentialsBand;
