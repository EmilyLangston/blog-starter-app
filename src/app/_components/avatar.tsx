type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture || null} alt={name || "Author"} className="w-12 h-12 rounded-full mr-4" />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
