import React from 'react'
import { Search, UserRound, ChevronDown , Plus } from 'lucide-react'

function KanbanFilters({
    SelectQuery,
    SelectAssignee,
    SelectPriority,
    SelectStatus,
    setOpenModal,
    uniqueAssignees,
    columns,
    priorities
 }
) {
    return (
        <div className='flex flex-row m-sm justify-between'>

            <div className='flex flex-row gap-sm'>
                {/* search bar */}
                <div className='relative'>

                    <Search className=" absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        onChange={(e) => SelectQuery(e.target.value)}
                        className='w-[256px] rounded-sm border border-border py-2 pl-10 pr-4'
                        type='text'
                        placeholder='Search Tasks'
                    />

                </div>

                {/* assigne */}
                <div className='relative'>
                    <UserRound className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <select onChange={(e) => SelectAssignee(e.target.value)} className='w-[160px] rounded-sm border border-border py-2 pl-10 pr-4 appearance-none'>

                        <option value="">All Assignee</option>
                        {
                            uniqueAssignees.map((assignee) => (
                                <option key={assignee.id}>
                                    {assignee.name}
                                </option>
                            ))
                        }
                    </select>
                    <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none' />
                </div>

                {/* status */}
                <div className='relative'>
                    <select onChange={(e) => SelectStatus(e.target.value)} className='w-[160px] rounded-sm border border-border py-2 pl-10 pr-4 appearance-none'>
                        <option value="">All Status</option>
                        {
                            columns.map((cols, index) => (
                                <option key={index}>
                                    {cols}
                                </option>
                            ))
                        }
                    </select>
                    <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none' />
                </div>

                {/* priority */}
                <div className='relative'>
                    <select onChange={(e) => SelectPriority(e.target.value)} className='w-[160px] rounded-sm border border-border py-2 pl-10 pr-4 appearance-none'>
                        <option value="">All Priority</option>
                        {
                            priorities.map((priority, index) => (
                                <option key={index}>
                                    {priority}
                                </option>
                            ))
                        }
                    </select>
                    <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none' />
                </div>

            </div>


            {/* create task*/}
            {/* <div className='relative flex flex-row items-center aligns-center'>
                <Plus className='absolute' size={16} />
                <button onClick={() => setOpenModal(true)} className=' h-full w-[120px] rounded-sm border border-border px-4 py-2 cursor-pointer'>
                    Add Task
                </button>
            </div> */}

        </div>
    )
}

export default KanbanFilters
