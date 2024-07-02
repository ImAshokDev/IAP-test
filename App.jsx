// import {addWeeks, format} from 'date-fns';
// import React, {useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Agenda} from 'react-native-calendars';

const totalEvents = {
  '2024-07-03': [
    {
      index: 0,
      time: '09:00 AM',
      title: 'Team Meeting',
      description: 'Discuss project updates and milestones',
    },
    {
      index: 1,
      time: '02:00 PM',
      title: 'Client Call',
      description: 'Review project requirements with the client',
    },
  ],
  '2024-07-04': [
    {
      index: 0,
      time: '10:00 AM',
      title: 'Design Review',
      description: 'Review the new design mockups with the team',
    },
    {
      index: 1,
      time: '03:00 PM',
      title: 'Code Review',
      description: 'Peer review the latest code submissions',
    },
  ],
  '2024-07-05': [
    {
      index: 0,
      time: '11:00 AM',
      title: 'Marketing Meeting',
      description: 'Plan the marketing strategy for the next quarter',
    },
    {
      index: 1,
      time: '01:00 PM',
      title: 'Lunch with Partner',
      description: 'Discuss partnership opportunities over lunch',
    },
  ],
  '2024-07-06': [
    {
      index: 0,
      time: '08:30 AM',
      title: 'Yoga Session',
      description: 'Morning yoga to start the day',
    },
    {
      index: 1,
      time: '04:00 PM',
      title: 'Product Launch Preparation',
      description: 'Finalize preparations for the product launch',
    },
  ],
  '2024-07-07': [
    {
      index: 0,
      time: '09:00 AM',
      title: 'Sprint Planning',
      description: 'Plan the tasks for the upcoming sprint',
    },
    {
      index: 1,
      time: '05:00 PM',
      title: 'Happy Hour',
      description: 'Team bonding at the local bar',
    },
  ],
};

// const AgendaScreen = () => {
//   const [items, setItems] = useState({});

//   console.log('DAT', items);
//   const loadItems = day => {
//     setTimeout(() => {
//       const newItems = {};
//       for (let i = -1; i < 5; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           newItems[strTime] = [];
//           for (let j = 0; j < 2; j++) {
//             newItems[strTime].push({
//               time: `${10 + j * 2}:00`,
//               title: `Event ${j + 1}`,
//               description: `Description for event ${j + 1} on ${strTime}`,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         }
//       }
//       setItems({
//         ...items,
//         ...newItems,
//       });
//     }, 1000);
//   };

//   const renderItem = item => {
//     return (
//       <View style={[styles.item, {height: item.height}]}>
//         <Text style={styles.itemText}>{item.time}</Text>
//         <Text style={styles.itemText}>{item.title}</Text>
//         <Text style={styles.itemText}>{item.description}</Text>
//       </View>
//     );
//   };

//   const timeToString = time => {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   };

//   return (
//     <Agenda
//       // items={
//       //   totalEvents
//       //     ? {
//       //         ...totalEvents,
//       //       }
//       //     : {}
//       // }
//       items={items}
//       loadItemsForMonth={day => {
//         const dates = [];
//         for (let i = -1; i < 6; i++) {
//           const date = new Date(day.timestamp + i * 24 * 60 * 60 * 1000);
//           dates.push(timeToString(date));
//         }
//         loadItems(dates);
//       }}
//       selected={timeToString(new Date())}
//       renderItem={renderItem}
//       // loadItemsForMonth={loadItems}
//       // renderItem={renderItem}
//       // selected={timeToString(new Date())}
//       //

//       ///
//       // selected={format(new Date(), 'yyyy-MM-dd')}
//       // minDate={format(new Date(), 'yyyy-MM-dd')}
//       // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//       // maxDate={format(addWeeks(new Date(), 1), 'yyyy-MM-dd')}
//       // selected={timeToString(new Date())}

//       renderEmptyDate={() => {
//         return (
//           <View>
//             <View style={{height: 80}} />
//           </View>
//         );
//       }}
//       // pastScrollRange={1}
//       // // Max amount of months allowed to scroll to the future. Default = 50
//       // futureScrollRange={1}
//       // // specify what should be rendered instead of ActivityIndicator

//       // // specify your item comparison function for increased performance
//       rowHasChanged={(r1, r2) => {
//         return r1.name !== r2.name;
//         // return true;
//       }}
//       // onRefresh={() => console.log('refreshing...')}
//       // // Set this true while waiting for new data from a refresh
//       // refreshing={false}
//       // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
//       // refreshControl={null}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: 'pink',
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },

//   itemText: {
//     fontSize: 20,
//     color: '#000000',
//     paddingVertical: 4,
//   },
// });

// export default AgendaScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';

const AgendaScreen = () => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const today = new Date();
    const weekDates = getWeekDates(today);
    loadItems(weekDates);
  }, []);

  const getWeekDates = date => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      dates.push(timeToString(day));
      dates.push({index: i});
    }
    return dates;
  };

  const loadItems = dates => {
    const newItems = {};
    dates.forEach(date => {
      if (!items[date]) {
        newItems[date] = [
          {
            index1: 1,
            time: '10:00 AM',
            title: 'Event 1',
            description: `Description for event 1 on ${date}`,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          },
          {
            index1: 2,
            time: '2:00 PM',
            title: 'Event 2',
            description: `Description for event 2 on ${date}`,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          },
        ];
      }
    });

    setItems(prevItems => ({
      ...prevItems,
      ...newItems,
    }));
  };

  const renderItem = item => {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.time}</Text>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <Agenda
      items={totalEvents}
      // loadItemsForMonth={day => {
      //   const weekDates = getWeekDates(new Date(day.timestamp));
      //   loadItems(weekDates);
      // }}
      selected={timeToString(new Date())}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'pink',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },

  itemText: {
    fontSize: 20,
    color: '#000000',
    paddingVertical: 4,
  },
});

export default AgendaScreen;
