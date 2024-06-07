import { IconType } from 'react-icons';
import {
  LuCloudy,
  LuDatabase,
  LuGithub,
  LuListChecks,
  LuListTree,
  LuNetwork,
  LuPencilRuler,
  LuSearchCode,
  LuSendToBack,
  LuSparkles,
} from 'react-icons/lu';

const icons: {
  [name: string]: IconType;
} = {
  LuCloudy: (props) => <LuCloudy {...props} />,
  LuDatabase: (props) => <LuDatabase {...props} />,
  LuGithub: (props) => <LuGithub {...props} />,
  LuListChecks: (props) => <LuListChecks {...props} />,
  LuListTree: (props) => <LuListTree {...props} />,
  LuNetwork: (props) => <LuNetwork {...props} />,
  LuPencilRuler: (props) => <LuPencilRuler {...props} />,
  LuSearchCode: (props) => <LuSearchCode {...props} />,
  LuSendToBack: (props) => <LuSendToBack {...props} />,
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
