<script lang="ts">
	import Actions from "../ui/Actions.svelte";


    interface Props {
        item: unknown;
        showEdit: boolean;
        isEditDisabled: boolean;
        onClickEdit: ()=> void;
    }

    let {item, showEdit, isEditDisabled, onClickEdit} : Props = $props();
</script>

<Actions {item} {showEdit} {isEditDisabled} {onClickEdit}/>