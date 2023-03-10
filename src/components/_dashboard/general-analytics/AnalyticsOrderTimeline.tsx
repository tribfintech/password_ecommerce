// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector
} from '@material-ui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
import mockData from '../../../utils/mock-data';

// ----------------------------------------------------------------------

const TITLES = [
  '1983, orders, $4220',
  '12 Invoices have been paid',
  'Order #37745 from September',
  'New order placed #XF-2356',
  'New order placed #XF-2346'
];

const MOCK_TIMELINES = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: TITLES[index],
  type: `order${index + 1}`,
  time: mockData.time(index)
}));

// ----------------------------------------------------------------------

type OrderItemProps = {
  item: {
    id: string;
    title: string;
    time: Date | string | number;
    type: string;
  };
  isLast: boolean;
};

function OrderItem({ item, isLast }: OrderItemProps) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AnalyticsOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {MOCK_TIMELINES.map((item, index) => (
            <OrderItem key={item.id} item={item} isLast={index === MOCK_TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
