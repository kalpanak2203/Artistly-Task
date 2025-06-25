interface Artist {
  id: number;
  name: string;
  category: string;
  location: string;
  price: string;
}

export default function ArtistTable({ data }: { data: Artist[] }) {
  if (!data.length) return <p className="text-gray-500">No artists available.</p>;

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Location</th>
          <th className="p-2 border">Fee</th>
        </tr>
      </thead>
      <tbody>
        {data.map((artist) => (
          <tr key={artist.id}>
            <td className="p-2 border">{artist.name}</td>
            <td className="p-2 border">{artist.category}</td>
            <td className="p-2 border">{artist.location}</td>
            <td className="p-2 border">{artist.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
