interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-gray-800 hover:bg-gray-900 trasition duration-500 hover:ring-4 hover:ring-cyan-500 text-white px-10 py-5 rounded-lg">
      {children}
    </div>
  );
};

export default Card;
