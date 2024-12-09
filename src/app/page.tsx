const mockData = [
  {
    company: "Automattic",
    position: "Code Wrangler",
    date: "11/22",
    status: "pending",
  },
  {
    company: "Happy Cog",
    position: "Frontend Developer",
    date: "11/22",
    status: "pending",
  },
  {
    company: "Tucows",
    position: "Software Engineer - Frontend",
    date: "11/22",
    status: "pending",
  },
  {
    company: "Carnegie",
    position: "Frontend Developer",
    date: "11/22",
    status: "pending",
  },
];

const mockApplications = mockData.map((application, index) => ({
  id: index + 1,
  ...application,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockApplications.map((application) => (
          <div key={application.id} className="w-96 p-4">
            <h2>{application.position}</h2>
            <p>
              {application.company} &bull; {application.date} &bull;{" "}
              {application.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
