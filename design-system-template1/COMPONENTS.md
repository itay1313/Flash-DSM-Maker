# Components Index

Complete list of all components in the design system.

## Primitives

### Button
- **File**: `design-system/primitives/button/button.tsx`
- **Stories**: `design-system/primitives/button/button.stories.tsx`
- **Variants**: primary, secondary, tertiary, ghost, danger
- **Sizes**: sm, md, lg, icon, icon-sm, icon-lg
- **Features**: loading state, disabled state, asChild prop

### Input
- **File**: `design-system/primitives/input/input.tsx`
- **Stories**: `design-system/primitives/input/input.stories.tsx`
- **Types**: text, email, password, number, tel, url

### Textarea
- **File**: `design-system/primitives/textarea/textarea.tsx`
- **Features**: Auto-resize support

### Select
- **File**: `design-system/primitives/select/select.tsx`
- **Components**: Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue

### Checkbox
- **File**: `design-system/primitives/checkbox/checkbox.tsx`
- **Features**: Indeterminate state support

### Radio
- **File**: `design-system/primitives/radio/radio.tsx`
- **Components**: RadioGroup, RadioGroupItem

### Switch
- **File**: `design-system/primitives/switch/switch.tsx`
- **Features**: Animated toggle

### Tooltip
- **File**: `design-system/primitives/tooltip/tooltip.tsx`
- **Components**: Tooltip, TooltipTrigger, TooltipContent, TooltipProvider

### Dialog
- **File**: `design-system/primitives/dialog/dialog.tsx`
- **Components**: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription

### Badge
- **File**: `design-system/primitives/badge/badge.tsx`
- **Variants**: default, secondary, outline, success, warning, error, info

### Tag
- **File**: `design-system/primitives/tag/tag.tsx`
- **Variants**: default, primary, secondary, success, warning, error
- **Sizes**: sm, md, lg
- **Features**: Removable tags

### Icon
- **File**: `design-system/primitives/icon/icon.tsx`
- **Registry**: `design-system/primitives/icon/icon-registry.ts`
- **Gallery**: `design-system/primitives/icon/icon-gallery.stories.tsx`
- **Icons**: ~130+ icons from lucide-react

## Form Controls

### TextField
- **File**: `design-system/form/text-field/text-field.tsx`
- **Stories**: `design-system/form/text-field/text-field.stories.tsx`
- **Features**: Label, hint, error, required indicator

### SelectField
- **File**: `design-system/form/select-field/select-field.tsx`
- **Features**: Label, hint, error, options array

### CheckboxField
- **File**: `design-system/form/checkbox-field/checkbox-field.tsx`
- **Features**: Label, hint, error

### SwitchField
- **File**: `design-system/form/switch-field/switch-field.tsx`
- **Features**: Label, hint, error

### TextareaField
- **File**: `design-system/form/textarea-field/textarea-field.tsx`
- **Features**: Label, hint, error, required indicator

## Feedback

### Spinner
- **File**: `design-system/feedback/spinner/spinner.tsx`
- **Stories**: `design-system/feedback/spinner/spinner.stories.tsx`
- **Sizes**: sm, md, lg, xl
- **Variants**: primary, secondary, neutral, white

### Skeleton
- **File**: `design-system/feedback/skeleton/skeleton.tsx`
- **Features**: Animated loading placeholder

### ProgressBar
- **File**: `design-system/feedback/progress-bar/progress-bar.tsx`
- **Sizes**: sm, md, lg
- **Variants**: primary, secondary, success, warning, error

### Toast
- **File**: `design-system/feedback/toast/toast.tsx`
- **Variants**: default, success, error, warning, info
- **Features**: Title, description, close button

## Navigation

### Breadcrumb
- **File**: `design-system/navigation/breadcrumb/breadcrumb.tsx`
- **Features**: Home icon, custom separator, icons support

### Navbar
- **File**: `design-system/navigation/navbar/navbar.tsx`
- **Features**: Logo, left content, right content, sticky positioning

### Sidebar
- **File**: `design-system/navigation/sidebar/sidebar.tsx`
- **Features**: Logo, navigation items, footer, active state

### Tabs
- **File**: `design-system/navigation/tabs/tabs.tsx`
- **Stories**: `design-system/navigation/tabs/tabs.stories.tsx`
- **Components**: Tabs, TabsList, TabsTrigger, TabsContent

### DropdownMenu
- **File**: `design-system/navigation/dropdown-menu/dropdown-menu.tsx`
- **Components**: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut

## Composite

### AvatarWithStatus
- **File**: `design-system/composite/avatar-with-status/avatar-with-status.tsx`
- **Stories**: `design-system/composite/avatar-with-status/avatar-with-status.stories.tsx`
- **Sizes**: sm, md, lg, xl
- **Statuses**: online, offline, away, busy

### ChatInput
- **File**: `design-system/composite/chat-input/chat-input.tsx`
- **Features**: Auto-resize, Enter to submit, max length, send button

### ChatBubble
- **File**: `design-system/composite/chat-bubble/chat-bubble.tsx`
- **Variants**: sent, received
- **Features**: Avatar, timestamp, sender name

### MentionList
- **File**: `design-system/composite/mention-list/mention-list.tsx`
- **Features**: Searchable, selectable, avatar support, status indicators

### DataCard
- **File**: `design-system/composite/data-card/data-card.tsx`
- **Stories**: `design-system/composite/data-card/data-card.stories.tsx`
- **Features**: Title, value, description, trend, icon, action

### FileIcon
- **File**: `design-system/composite/file-icon/file-icon.tsx`
- **Sizes**: sm, md, lg
- **Features**: File type detection, appropriate icons

### Table
- **File**: `design-system/composite/table/table.tsx`
- **Components**: Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption

### Pagination
- **File**: `design-system/composite/pagination/pagination.tsx`
- **Features**: Page numbers, ellipsis, first/last buttons, sibling count

## Layout

### Grid
- **File**: `design-system/layout/grid/grid.tsx`
- **Components**: Grid, GridItem
- **Columns**: 1, 2, 3, 4, 5, 6, 12
- **Gaps**: sm, md, lg, xl

### Card
- **File**: `design-system/layout/card/card.tsx`
- **Stories**: `design-system/layout/card/card.stories.tsx`
- **Components**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### DashboardWidget
- **File**: `design-system/layout/dashboard-widget/dashboard-widget.tsx`
- **Features**: Title, description, header action, footer, loading state

## Story Coverage

### Stories Created
- ✅ Button (8 stories)
- ✅ Input (4 stories)
- ✅ TextField (6 stories)
- ✅ Spinner (3 stories)
- ✅ AvatarWithStatus (5 stories)
- ✅ Tabs (2 stories)
- ✅ Card (3 stories)
- ✅ DataCard (4 stories)
- ✅ Icon Gallery (1 story)

### Stories Needed (Pattern Provided)
All components follow the same story pattern. To create stories for remaining components:

1. Create `component-name.stories.tsx` in component directory
2. Include stories for:
   - Default
   - Variants
   - Sizes (if applicable)
   - Disabled state
   - Loading state (if applicable)
   - Accessibility checks

## Usage Examples

See individual component stories in Storybook for detailed usage examples and prop documentation.

