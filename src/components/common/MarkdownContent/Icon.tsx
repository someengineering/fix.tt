import { IconType } from 'react-icons';
import {
  LuCloudy,
  LuDatabase,
  LuGitFork,
  LuGithub,
  LuListTree,
  LuPencilRuler,
  LuSparkles,
} from 'react-icons/lu';

const icons: {
  [name: string]: IconType;
} = {
  LuCloudy: (props) => <LuCloudy {...props} />,
  LuDatabase: (props) => <LuDatabase {...props} />,
  LuGitFork: (props) => <LuGitFork {...props} />,
  LuGithub: (props) => <LuGithub {...props} />,
  LuListTree: (props) => <LuListTree {...props} />,
  LuPencilRuler: (props) => <LuPencilRuler {...props} />,
  LuSparkles: (props) => <LuSparkles {...props} />,
};

export default function Icon({
  name,
  ...props
}: {
  name: string;
} & React.JSX.IntrinsicAttributes &
  React.SVGProps<SVGSVGElement>) {
  return name in icons ? icons[name](props) : icons.LuSparkles(props);
}
