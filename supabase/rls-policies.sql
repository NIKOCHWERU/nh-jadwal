-- Row Level Security (RLS) Policies for Kantor NH
-- Run this SQL in your Supabase project SQL editor after creating tables

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Schedules RLS Policies
CREATE POLICY "Users can view schedules they created or attend" ON schedules
  FOR SELECT USING (
    created_by = auth.uid() OR
    auth.uid() = ANY(attendees)
  );

CREATE POLICY "Admins can view all schedules" ON schedules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can create schedules" ON schedules
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own schedules" ON schedules
  FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Admins can update all schedules" ON schedules
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can delete own schedules" ON schedules
  FOR DELETE USING (created_by = auth.uid());

CREATE POLICY "Admins can delete all schedules" ON schedules
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Tasks RLS Policies
CREATE POLICY "Users can view assigned or created tasks" ON tasks
  FOR SELECT USING (assigned_to = auth.uid() OR created_by = auth.uid());

CREATE POLICY "Admins can view all tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can create tasks" ON tasks
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update assigned or created tasks" ON tasks
  FOR UPDATE USING (assigned_to = auth.uid() OR created_by = auth.uid());

CREATE POLICY "Admins can update all tasks" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can delete created tasks" ON tasks
  FOR DELETE USING (created_by = auth.uid());

CREATE POLICY "Admins can delete all tasks" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Projects RLS Policies
CREATE POLICY "Users can view projects they manage or are team member" ON projects
  FOR SELECT USING (
    project_manager = auth.uid() OR
    auth.uid() = ANY(team_members)
  );

CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Project managers can update own projects" ON projects
  FOR UPDATE USING (project_manager = auth.uid());

CREATE POLICY "Admins can update all projects" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Teams RLS Policies
CREATE POLICY "Users can view teams they are member or lead" ON teams
  FOR SELECT USING (
    team_lead = auth.uid() OR
    created_by = auth.uid() OR
    auth.uid() = ANY(members)
  );

CREATE POLICY "Admins can view all teams" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Users can create teams" ON teams
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Announcements RLS Policies
CREATE POLICY "Users can view announcements" ON announcements
  FOR SELECT USING (
    target_audience IS NULL OR
    auth.uid() = ANY(target_audience) OR
    cardinality(target_departments) = 0 OR
    department = ANY(target_departments)
  );

CREATE POLICY "Users can create announcements" ON announcements
  FOR INSERT WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update own announcements" ON announcements
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Admins can update all announcements" ON announcements
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Attendance RLS Policies
CREATE POLICY "Users can view own attendance" ON attendances
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own attendance" ON attendances
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own attendance" ON attendances
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all attendance" ON attendances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can update all attendance" ON attendances
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Attendance Settings (Admin only)
CREATE POLICY "Only admins can access attendance settings" ON attendance_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Activity Logs RLS Policies
CREATE POLICY "Users can view own activity logs" ON activity_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all activity logs" ON activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Allow system to insert activity logs
CREATE POLICY "System can insert activity logs" ON activity_logs
  FOR INSERT WITH CHECK (true);