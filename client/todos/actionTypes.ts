export interface ActionType<TAction> extends String {}

export interface Action {
    type: string
}

export function isType<T extends Action>(
    action: Action,
    type: ActionType<T>
): action is T
export function isType<T extends Action>(
    action: Action,
    type: string
): action is T
{
    return action.type === type;
}
export interface Reducer<T> {
    (state: T, action: Action): T;
}
