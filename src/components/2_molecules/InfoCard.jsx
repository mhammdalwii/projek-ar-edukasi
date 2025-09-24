import Heading from "../1_atoms/Heading";

export default function InfoCard({ title }) {
  return (
    <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md max-w-sm w-full">
      <Heading text={title} />
    </div>
  );
}
