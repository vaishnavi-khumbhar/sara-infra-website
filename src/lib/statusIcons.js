import { Building2, BrickWall, CalendarClock, DoorOpen } from 'lucide-react'

/** Icons that match each project status label. */
export const STATUS_ICONS = {
  all: Building2, // All Projects – buildings
  'under-construction': BrickWall, // Under Construction – walls being built
  upcoming: CalendarClock, // Upcoming – launching soon
  ready: DoorOpen, // Ready to Move – door open, move in
}